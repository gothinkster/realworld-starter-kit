using System;

namespace Conduit.Domain.Common;

public abstract class Entity<TId> : IComparable
    where TId : ValueObject
{
    public virtual TId? Id { get; protected set; }

    protected Entity(TId? id)
    {
        Id = id;
    }

    public override bool Equals(object? other)
    {
        if (other is not Entity<TId> otherEntity)
        {
            return false;
        }

        if (ReferenceEquals(this, otherEntity))
        {
            return true;
        }

        if (GetType() != otherEntity.GetType())
        {
            return false;
        }

        if (Id is null)
        {
            return false;
        }

        return Id.Equals(otherEntity.Id);
    }

    public static bool operator ==(Entity<TId> a, Entity<TId> b)
    {
        if (a is null && b is null)
        {
            return true;
        }

        if (a is null || b is null)
        {
            return false;
        }

        return a.Equals(b);
    }

    public static bool operator !=(Entity<TId> a, Entity<TId> b)
    {
        return !(a == b);
    }

    public override int GetHashCode()
    {
        if (Id == null)
        {
            return base.GetHashCode();
        }

        return Id.GetHashCode();
    }

    public virtual int CompareTo(object? other)
    {
        if (other is not Entity<TId> otherEntity)
        {
            return 1;
        }

        if (ReferenceEquals(this, otherEntity))
        {
            return 0;
        }

        if (Id is null && otherEntity.Id is null)
        {
            return 0;
        }

        if (Id is null)
        {
            return -1;
        }

        return Id.CompareTo(otherEntity.Id);
    }
}
