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
        var address = new Address("Street", "City");
        var derivedAddress = new DerivedAddress("Country", "Street", "City");

        address.Equals(derivedAddress).Should().BeFalse();
        derivedAddress.Equals(address).Should().BeFalse();
    }

    [Fact]
    public void Two_VO_of_the_same_content_are_equal()
    {
        var address1 = new Address("Street", "City");
        var address2 = new Address("Street", "City");

        address1.Equals(address2).Should().BeTrue();
        address1.GetHashCode().Equals(address2.GetHashCode()).Should().BeTrue();
    }

    [Fact]
    public void It_is_possible_to_override_default_equality_comparison_behavior()
    {
        var money1 = new Money("usd", 2.2222m);
        var money2 = new Money("USD", 2.22m);

        money1.Equals(money2).Should().BeTrue();
        money1.GetHashCode().Equals(money2.GetHashCode()).Should().BeTrue();
    }

    [Fact]
    public void Comparing_value_objects_of_different_types_returns_false()
    {
        var vo1 = new VO1("1");
        var vo2 = new VO2("1");

        vo1.Equals(vo2).Should().BeFalse();
    }

    [Fact]
    public void Comparing_value_objects_with_different_collections_returns_false()
    {
        var vo1 = new VOWithCollection("one", "two");
        var vo2 = new VOWithCollection("one", "three");

        var result1 = vo1.Equals(vo2);
        var result2 = vo2.Equals(vo1);

        result1.Should().BeFalse();
        result2.Should().BeFalse();
    }

    [Fact]
    public void Comparing_value_objects_with_collections_of_different_size_returns_false()
    {
        var vo1 = new VOWithCollection("one", "two");
        var vo2 = new VOWithCollection("one", "two", "three");

        var result1 = vo1.Equals(vo2);
        var result2 = vo2.Equals(vo1);

        result1.Should().BeFalse();
        result2.Should().BeFalse();
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
        public string Value
        {
            get;
        }

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
        public string Value
        {
            get;
        }

        public VO2(string value)
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
        public string Currency
        {
            get;
        }
        public decimal Amount
        {
            get;
        }

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
        public string Street
        {
            get;
        }
        public string City
        {
            get;
        }

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
        public string Country
        {
            get;
        }

        public DerivedAddress(string country, string street, string city)
            : base(street, city)
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
