using System;
using System.Collections.Generic;
using System.Linq;
using Conduit.Domain.Common;
using FluentAssertions;
using Xunit;

namespace Conduit.Domain.Test.Common.EntityTests;

public class IComparableTests
{
    [Fact]
    public void Can_sort_entities()
    {
        MyEntity entity1 = new(new IntId(1));
        MyEntity entity2 = new(new IntId(2));
        MyEntity entity3 = new(new IntId(3));
        MyEntity entity4 = new(new IntId(4));

        MyEntity[] myEntities = new[] { entity3, entity1, entity4, entity2 }
            .OrderBy(x => x)
            .ToArray();

        myEntities[0].Should().BeSameAs(entity1);
        myEntities[1].Should().BeSameAs(entity2);
        myEntities[2].Should().BeSameAs(entity3);
        myEntities[3].Should().BeSameAs(entity4);
    }

    [Fact]
    public void Compare_against_null_object_returns_1()
    {
        MyEntity entity = new(new IntId(1));

        int result = entity.CompareTo(null);

        result.Should().Be(1);
    }

    [Fact]
    public void Compare_same_objects_returns_0()
    {
        MyEntity entity = new(new IntId(1));

        int result = entity.CompareTo(entity);

        result.Should().Be(0);
    }

    [Fact]
    public void Compare_entities_with_nullable_id()
    {
        NullableEntity entity1 = new();
        NullableEntity entity2 = new();
        NullableEntity entity3 = new(new NullableId(1));

        int result1 = entity1.CompareTo(entity2);
        int result2 = entity1.CompareTo(entity3);
        int result3 = entity3.CompareTo(entity1);

        result1.Should().Be(0);
        result2.Should().Be(-1);
        result3.Should().Be(1);
    }

    [Fact]
    public void Entities_with_different_id_types_are_comparatively_null()
    {
        MyEntity longEntity = new(new IntId(1));
        MyOtherEntity guidEntity = new(new GuidId(new Guid("282e6fe9-a272-45da-aa16-757449ab2818")));

        int result1 = longEntity.CompareTo(guidEntity);
        int result2 = guidEntity.CompareTo(longEntity);

        result1.Should().Be(1);
        result2.Should().Be(1);
    }

    [Fact]
    public void Can_sort_entity_that_is_null()
    {
        MyEntity entity1 = new(new IntId(1));
        MyEntity entity2 = new(new IntId(2));

        MyEntity[] entities = [.. new[] { entity1, entity2, null }.OrderBy(x => x)];

        entities[0].Should().BeNull();
        entities[1].Should().BeSameAs(entity1);
        entities[2].Should().BeSameAs(entity2);
    }

    private class MyEntity : Entity<IntId>
    {
        public MyEntity(IntId id)
            : base(id)
        {
        }
    }

    private class MyOtherEntity : Entity<GuidId>
    {
        public MyOtherEntity(GuidId id)
            : base(id)
        {
        }
    }

    private class NullableEntity : Entity<NullableId>
    {
        public NullableEntity() : base(null)
        {
        }

        public NullableEntity(NullableId id)
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

    public class GuidId : ValueObject
    {
        public Guid Value { get; }

        public GuidId(Guid value)
        {
            Value = value;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value;
        }
    }

    public class NullableId : ValueObject
    {
        public int? Value { get; }

        public NullableId()
        {
        }

        public NullableId(int value)
        {
            Value = value;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value;
        }
    }
}
