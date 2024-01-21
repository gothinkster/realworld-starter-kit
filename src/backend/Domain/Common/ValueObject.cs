using System;
using System.Collections.Generic;
using System.Linq;

namespace Conduit.Domain.Common;

public abstract class ValueObject : IComparable
{
    int? _cachedHashCode;

    protected abstract IEnumerable<IComparable?> GetAtomicValues();

    public static bool operator ==(ValueObject? a, ValueObject? b)
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

    public static bool operator !=(ValueObject? a, ValueObject? b)
    {
        return !(a == b);
    }

    public override bool Equals(object? other)
    {
        if (other == null)
        {
            return false;
        }

        if (ReferenceEquals(this, other))
        {
            return true;
        }

        if (GetType() != other.GetType())
        {
            return false;
        }

        ValueObject valueObject = (ValueObject)other;

        return GetAtomicValues().SequenceEqual(valueObject.GetAtomicValues());
    }

    public override int GetHashCode()
    {
        if (!_cachedHashCode.HasValue)
        {
            _cachedHashCode = GetAtomicValues()
                .Aggregate(default(int), (current, obj) =>
                {
                    return HashCode.Combine(current, obj?.GetHashCode() ?? 0);
                });
        }

        return _cachedHashCode.Value;
    }

    public virtual int CompareTo(object? other)
    {
        if (other is null)
        {
            return 1;
        }

        if (ReferenceEquals(this, other))
        {
            return 0;
        }

        Type thisType = GetType();
        Type otherType = other.GetType();
        if (thisType != otherType)
        {
            return string.Compare($"{thisType}", $"{otherType}", StringComparison.Ordinal);
        }

        return
            GetAtomicValues().Zip(
                ((ValueObject)other).GetAtomicValues(),
                (left, right) =>
                    left?.CompareTo(right) ?? (right is null ? 0 : -1))
            .FirstOrDefault(cmp => cmp != 0);
    }

    protected void CheckRule(IBusinessRule rule)
    {
        if (rule.IsBroken())
        {
            throw new BusinessRuleValidationException(rule);
        }
    }
}
