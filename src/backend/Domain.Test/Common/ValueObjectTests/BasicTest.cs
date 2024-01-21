using System;
using System.Collections.Generic;
using Conduit.Domain.Common;
using FluentAssertions;
using Xunit;

namespace Conduit.Domain.Test.Common.ValueObjectTests;

public class BasicTests
{
    [Fact]
    public void Derived_value_objects_are_not_equal()
    {
        Address address = new("Street", "City");
        Address derivedAddress = new DerivedAddress("Country", "Street", "City");

        address.Equals(derivedAddress).Should().BeFalse();
        derivedAddress.Equals(address).Should().BeFalse();
    }

    [Fact]
    public void Two_VO_of_the_same_content_are_equal()
    {
        Address address1 = new("Street", "City");
        Address address2 = new("Street", "City");

        address1.Equals(address2).Should().BeTrue();
        address1.GetHashCode().Equals(address2.GetHashCode()).Should().BeTrue();
    }

    [Fact]
    public void It_is_possible_to_override_default_equality_comparison_behavior()
    {
        Money money1 = new("usd", 2.2222m);
        Money money2 = new("USD", 2.22m);

        money1.Equals(money2).Should().BeTrue();
        money1.GetHashCode().Equals(money2.GetHashCode()).Should().BeTrue();
    }

    [Fact]
    public void Comparing_value_objects_of_different_types_returns_false()
    {
        VO1 vo1 = new("1");
        VO2 vo2 = new("1");

        vo1.Equals(vo2).Should().BeFalse();
    }

    [Fact]
    public void Comparing_value_objects_with_different_collections_returns_false()
    {
        VOWithCollection vo1 = new("one", "two");
        VOWithCollection vo2 = new("one", "three");

        bool result1 = vo1.Equals(vo2);
        bool result2 = vo2.Equals(vo1);

        result1.Should().BeFalse();
        result2.Should().BeFalse();
    }

    [Fact]
    public void Comparing_against_null_object_returns_false()
    {
        VOWithCollection vo1 = new("one", "two");
        VOWithCollection? vo2 = null;

#pragma warning disable CA1508 // Toten bedingten Code vermeiden
        bool result = vo1.Equals(vo2);
#pragma warning restore CA1508 // Toten bedingten Code vermeiden

        result.Should().BeFalse();
    }

    [Fact]
    public void Comparing_against_same_object_returns_true()
    {
        VOWithCollection vo1 = new("one", "two");

        bool result = vo1.Equals(vo1);

        result.Should().BeTrue();
    }

    [Fact]
    public void Comparing_value_objects_with_collections_of_different_size_returns_false()
    {
        VOWithCollection vo1 = new("one", "two");
        VOWithCollection vo2 = new("one", "two", "three");

        bool result1 = vo1.Equals(vo2);
        bool result2 = vo2.Equals(vo1);

        result1.Should().BeFalse();
        result2.Should().BeFalse();
    }

    [Fact]
    public void Null_objects_compared_by_operator_are_equal()
    {
        VOWithCollection? vo1 = null;
        VOWithCollection? vo2 = null;

#pragma warning disable CA1508 // Toten bedingten Code vermeiden
        bool result1 = vo1 == vo2;
        bool result2 = vo1 != vo2;
#pragma warning restore CA1508 // Toten bedingten Code vermeiden

        result1.Should().BeTrue();
        result2.Should().BeFalse();
    }

    [Fact]
    public void Comparing_against_null_by_operator_returns_false()
    {
        VOWithCollection? vo1 = new("one", "two");
        VOWithCollection? vo2 = null;

#pragma warning disable CA1508 // Toten bedingten Code vermeiden
        bool result1 = vo1 == vo2;
        bool result2 = vo2 == vo1;
        bool result3 = vo1 != vo2;
        bool result4 = vo2 != vo1;
#pragma warning restore CA1508 // Toten bedingten Code vermeiden

        result1.Should().BeFalse();
        result2.Should().BeFalse();
        result3.Should().BeTrue();
        result4.Should().BeTrue();
    }

    [Fact]
    public void Two_VO_of_the_same_content_compared_by_operator_are_equal()
    {
        Address address1 = new("Street", "City");
        Address address2 = new("Street", "City");

        bool result1 = address1 == address2;
        bool result2 = address1 != address2;

        result1.Should().BeTrue();
        result2.Should().BeFalse();
        address1.GetHashCode().Equals(address2.GetHashCode()).Should().BeTrue();
    }

    [Fact]
    public void VO_with_only_null_properties_has_hasCode_of_0()
    {
        VO3 vo = new();
        int expected = HashCode.Combine(default(int), 0);

        int hashCode = vo.GetHashCode();

        hashCode.Should().Be(expected);
    }

    private class VOWithCollection : ValueObject
    {
        readonly string[] _components;

        public VOWithCollection(params string[] components)
        {
            _components = components;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            return _components;
        }
    }

    public class VO1 : ValueObject
    {
        public string Value { get; }

        public VO1(string value)
        {
            Value = value;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value;
        }
    }

    public class VO2 : ValueObject
    {
        public string Value { get; }

        public VO2(string value)
        {
            Value = value;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value;
        }
    }

    public class VO3 : ValueObject
    {
        public string? Value { get; }

        public VO3()
        {

        }

        public VO3(string value)
        {
            Value = value;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value;
        }
    }

    public class Money : ValueObject
    {
        public string Currency { get; }
        public decimal Amount { get; }

        public Money(string currency, decimal amount)
        {
            Currency = currency;
            Amount = amount;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Currency.ToUpper();
            yield return Math.Round(Amount, 2);
        }
    }

    public class Address : ValueObject
    {
        public string Street { get; }
        public string City { get; }

        public Address(string street, string city)
        {
            Street = street;
            City = city;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Street;
            yield return City;
        }
    }


    public class DerivedAddress : Address
    {
        public string Country { get; }

        public DerivedAddress(string country, string street, string city) : base(street, city)
        {
            Country = country;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Street;
            yield return City;
            yield return Country;
        }
    }


}
