using System;
using System.Collections.Generic;
using System.Linq;
using Conduit.Domain.Common;
using FluentAssertions;
using Xunit;

namespace Conduit.Domain.Test.Common.ValueObjectTests;

public class IComparableTests
{
    [Fact]
    public void Can_sort_simple_value_objects()
    {
        NameSuffix name3 = new(3);
        NameSuffix name1 = new(1);
        NameSuffix name4 = new(4);
        NameSuffix name2 = new(2);

        NameSuffix[] nameSuffixes = [.. new[] { name3, name1, name4, name2 }.OrderBy(x => x)];

        nameSuffixes[0].Should().BeSameAs(name1);
        nameSuffixes[1].Should().BeSameAs(name2);
        nameSuffixes[2].Should().BeSameAs(name3);
        nameSuffixes[3].Should().BeSameAs(name4);
    }

    [Fact]
    public void Compare_against_null_object_returns_1()
    {
        NameSuffix name = new(3);

        int result = name.CompareTo(null);

        result.Should().Be(1);
    }

    [Fact]
    public void Compare_same_objects_returns_0()
    {
        NameSuffix name = new(3);

        int result = name.CompareTo(name);

        result.Should().Be(0);
    }

    [Fact]
    public void Can_sort_complex_value_objects()
    {
        Name name112 = new("111", "111", new NameSuffix(2));
        Name name111 = new("111", "111", new NameSuffix(1));
        Name name221 = new("222", "222", new NameSuffix(1));
        Name name222 = new("222", "222", new NameSuffix(2));
        Name name121 = new("111", "222", new NameSuffix(1));
        Name name122 = new("111", "222", new NameSuffix(2));
        Name name212 = new("222", "111", new NameSuffix(2));
        Name name211 = new("222", "111", new NameSuffix(1));

        Name[] names = [.. new[] { name112, name111, name221, name222, name121, name122, name212, name211 }.OrderBy(x => x)];

        names[0].Should().BeSameAs(name111);
        names[1].Should().BeSameAs(name112);
        names[2].Should().BeSameAs(name121);
        names[3].Should().BeSameAs(name122);
        names[4].Should().BeSameAs(name211);
        names[5].Should().BeSameAs(name212);
        names[6].Should().BeSameAs(name221);
        names[7].Should().BeSameAs(name222);
    }

    [Fact]
    public void Can_sort_value_objects_containing_nulls()
    {
        Name name0 = new("0", "0", new NameSuffix(0));
        Name name3 = new("1", "1", new NameSuffix(1));
        Name name1 = new("1", null, new NameSuffix(1));
        Name name2 = new("1", null, new NameSuffix(2));
        Name name4 = new("1", "2", new NameSuffix(2));

        Name?[] names = [.. new[] { name0, name1, name2, name3, name4, null }.OrderBy(x => x)];

        names[0].Should().BeNull();
        names[1].Should().BeSameAs(name0);
        names[2].Should().BeSameAs(name1);
        names[3].Should().BeSameAs(name2);
        names[4].Should().BeSameAs(name3);
        names[5].Should().BeSameAs(name4);
    }

    [Fact]
    public void Two_value_objects_are_not_equal_if_they_contain_non_comparable_components_of_different_values()
    {
        VOWithObjectProperty vo1 = new(new object());
        VOWithObjectProperty vo2 = new(new object());

        int result1 = vo1.CompareTo(vo2);
        int result2 = vo2.CompareTo(vo1);

        result1.Should().NotBe(0);
        result2.Should().NotBe(0);
        Math.Sign(result1).Should().NotBe(Math.Sign(result2));
    }

    [Fact]
    public void Can_compare_value_objects_with_collections()
    {
        VOWithCollection vo1 = new("one", "two");
        VOWithCollection vo2 = new("one", "three");

        int result1 = vo1.CompareTo(vo2);
        int result2 = vo2.CompareTo(vo1);

        result1.Should().NotBe(0);
        result2.Should().NotBe(0);
        Math.Sign(result1).Should().NotBe(Math.Sign(result2));
    }

    [Fact]
    public void Can_compare_value_objects_with_collections_of_variable_size()
    {
        VOWithCollection vo1 = new("one", "two");
        VOWithCollection vo2 = new("one", "two", "three");

        int result1 = vo1.CompareTo(vo2);
        int result2 = vo2.CompareTo(vo1);

        result1.Should().NotBe(0);
        result2.Should().NotBe(0);
        Math.Sign(result1).Should().NotBe(Math.Sign(result2));
    }

    [Fact]
    public void Can_compare_value_objects_with_different_types()
    {
        VOIntType intValueObject = new(1);
        VOStringType stringValueObject = new("2");

        int result1 = intValueObject.CompareTo(stringValueObject);
        int result2 = stringValueObject.CompareTo(intValueObject);

        result1.Should().BeLessOrEqualTo(-1);
        result2.Should().BeGreaterOrEqualTo(-1);
        result1.Should().Be(-result2);
    }

    private class VOWithCollection : ValueObject
    {
        readonly string[] _components;

        public VOWithCollection(params string[] components)
        {
            _components = components;
        }

        protected override IEnumerable<IComparable> GetAtomicValues()
        {
            yield return _components.Length;
            foreach (string component in _components)
            {
                yield return component;
            }
        }
    }

    private class VOWithObjectProperty : ValueObject
    {
        public object SomeProperty
        {
            get;
        }

        public VOWithObjectProperty(object someProperty)
        {
            SomeProperty = someProperty;
        }

        protected override IEnumerable<IComparable> GetAtomicValues()
        {
            yield return SomeProperty.GetHashCode();
        }
    }

    private class Name : ValueObject
    {
        public string First
        {
            get;
        }
        public string? Last
        {
            get;
        }
        public NameSuffix Suffix
        {
            get;
        }

        public Name(string first, string? last, NameSuffix suffix)
        {
            First = first;
            Last = last;
            Suffix = suffix;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return First;
            yield return Last;
            yield return Suffix;
        }
    }


    private class NameSuffix : ValueObject
    {
        public int Value
        {
            get;
        }

        public NameSuffix(int value)
        {
            Value = value;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value;
        }
    }

    private class VOIntType : ValueObject
    {
        public int Value
        {
            get;
        }

        public VOIntType(int value)
        {
            Value = value;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value;
        }
    }

    private class VOStringType : ValueObject
    {
        public string Value
        {
            get;
        }

        public VOStringType(string value)
        {
            Value = value;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value;
        }
    }
}
