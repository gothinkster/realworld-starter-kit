using System;
using System.Collections.Generic;
using Conduit.Domain.Common;
using FluentAssertions;
using Xunit;

namespace Conduit.Domain.Test.Common.EntityTests;

public class BasicTests
{
    [Fact]
    public void Derived_entities_are_not_equal()
    {
        MyEntity entity1 = new(new IntId(1));
        MyEntity entity2 = new MyDerivedEntity(new IntId(1));

        bool equals1 = entity1.Equals(entity2);
        bool equals2 = entity1 == entity2;

        equals1.Should().BeFalse();
        equals2.Should().BeFalse();
    }

    [Fact]
    public void Entities_of_different_types_are_not_equal()
    {
        MyEntity entity1 = new(new IntId(1));
        MySecondEntity entity2 = new(new IntId(1));

        bool equals1 = entity1.Equals(entity2);
        bool equals2 = entity1 == entity2;

        equals1.Should().BeFalse();
        equals2.Should().BeFalse();
    }

    [Fact]
    public void Two_entities_of_the_same_id_are_equal()
    {
        MyEntity entity1 = new(new IntId(1));
        MyEntity entity2 = new(new IntId(1));

        bool equals1 = entity1.Equals(entity2);
        bool equals2 = entity1 == entity2;

        equals1.Should().BeTrue();
        equals2.Should().BeTrue();
    }

    [Fact]
    public void Two_entities_of_different_ids_are_not_equal()
    {
        MyEntity entity1 = new(new IntId(1));
        MyEntity entity2 = new(new IntId(2));

        bool equals1 = entity1.Equals(entity2);
        bool equals2 = entity1 == entity2;

        equals1.Should().BeFalse();
        equals2.Should().BeFalse();
    }

    [Fact]
    public void Id_can_be_a_custom_value_object()
    {
        Guid guid = Guid.NewGuid();
        EntityWithCustomId entity1 = new(new ComplexId("1", guid));
        EntityWithCustomId entity2 = new(new ComplexId("1", guid));

        bool equals1 = entity1.Equals(entity2);
        bool equals2 = entity1 == entity2;

        equals1.Should().BeTrue();
        equals2.Should().BeTrue();
    }

    [Fact]
    public void Comparison_to_null()
    {
        MyEntity? entity1 = new(new IntId(1));
        MyEntity? entity2 = null;
        MyEntity? entity3 = null;

#pragma warning disable CS8604 // Mögliches Nullverweisargument.
#pragma warning disable CA1508 // Toten bedingten Code vermeiden
#pragma warning disable CS8625 // Ein NULL-Literal kann nicht in einen Non-Nullable-Verweistyp konvertiert werden.
#pragma warning disable CS8602 // Dereferenzierung eines möglichen Nullverweises.
        (entity1 == null).Should().BeFalse();
        (entity2 == null).Should().BeTrue();
        (entity1.Equals(null)).Should().BeFalse();
        (entity2 == entity3).Should().BeTrue();
#pragma warning restore CS8602 // Dereferenzierung eines möglichen Nullverweises.
#pragma warning restore CS8625 // Ein NULL-Literal kann nicht in einen Non-Nullable-Verweistyp konvertiert werden.
#pragma warning restore CA1508 // Toten bedingten Code vermeiden
#pragma warning restore CS8604 // Mögliches Nullverweisargument.
    }

    [Fact]
    public void Comparing_same_entity()
    {
        MyEntity? entity = new(new IntId(1));

#pragma warning disable CS1718 // Vergleich erfolgte mit derselben Variable
        (entity == entity).Should().BeTrue();
        (entity != entity).Should().BeFalse();
#pragma warning restore CS1718 // Vergleich erfolgte mit derselben Variable
        (entity.Equals(entity)).Should().BeTrue();
    }

    [Fact]
    public void Two_entities_with_nullable_id_are_not_equal()
    {
        MyEntityWithStringId entity1 = MyEntityWithStringId.Create();
        MyEntityWithStringId entity2 = MyEntityWithStringId.Create();

        (entity1 == entity2).Should().BeFalse();
    }

    [Fact]
    public void Entities_with_same_id_have_same_hash_code()
    {

        MyEntityWithStringId entity1 = MyEntityWithStringId.Create("1");
        MyEntityWithStringId entity2 = MyEntityWithStringId.Create("1");

        (entity1.GetHashCode() == entity2.GetHashCode()).Should().BeTrue();
    }

    [Fact]
    public void Entities_with_null_id_have_diffrent_hash_code()
    {
        MyEntityWithStringId entity1 = MyEntityWithStringId.Create();
        MyEntityWithStringId entity2 = MyEntityWithStringId.Create();

        (entity1.GetHashCode() == entity2.GetHashCode()).Should().BeFalse();
    }

    public class MyEntityWithStringId : Entity<StringId>
    {
        public MyEntityWithStringId(StringId? id)
            : base(id)
        {
        }

        public static MyEntityWithStringId Create()
        {
            return new MyEntityWithStringId(null);
        }

        public static MyEntityWithStringId Create(string id)
        {
            return new MyEntityWithStringId(new StringId(id));
        }
    }

    public class MyEntity : Entity<IntId>
    {
        public MyEntity(IntId id)
            : base(id)
        {
        }
    }

    public class MySecondEntity : Entity<IntId>
    {
        public MySecondEntity(IntId id)
            : base(id)
        {
        }
    }

    public class MyDerivedEntity : MyEntity
    {
        public MyDerivedEntity(IntId id)
            : base(id)
        {
        }
    }

    public class IntId : ValueObject
    {
        public int Value { get; }

        public IntId(int value)
        {
            Value = value;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value;
        }
    }

    public class StringId : ValueObject
    {
        public string Value { get; }

        public StringId(string value)
        {
            Value = value;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value;
        }
    }

    public class ComplexId : ValueObject
    {
        public string Value1 { get; }
        public Guid Value2 { get; }

        public ComplexId(string value1, Guid value2)
        {
            Value1 = value1;
            Value2 = value2;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value1;
            yield return Value2;
        }
    }

    public class EntityWithCustomId : Entity<ComplexId>
    {
        public EntityWithCustomId(ComplexId id)
            : base(id)
        {
        }
    }
}
