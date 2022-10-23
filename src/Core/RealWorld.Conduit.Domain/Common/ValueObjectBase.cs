namespace Conduit.Core.Common
{
    [Serializable]
    public abstract class ValueObjectBase : IValueObject, IComparable, IComparable<ValueObjectBase>
    {
        private int? _cachedHashCode;

        public virtual int CompareTo(object obj)
        {
            var thisType = GetUnproxiedType(this);
            var otherType = GetUnproxiedType(obj);

            if (thisType != otherType)
            {
                return string.Compare(thisType.ToString(), otherType.ToString(), StringComparison.Ordinal);
            }

            var other = (ValueObjectBase)obj;

            var components = GetEqualityComponents().ToArray();
            var otherComponents = other.GetEqualityComponents().ToArray();

            for (var i = 0; i < components.Length; i++)
            {
                var comparison = CompareComponents(components[i], otherComponents[i]);
                if (comparison != 0)
                {
                    return comparison;
                }
            }

            return 0;
        }

        public virtual int CompareTo(ValueObjectBase other) => CompareTo(other as object);

        protected abstract IEnumerable<object> GetEqualityComponents();

        public override bool Equals(object obj)
        {
            if (obj == null)
            {
                return false;
            }

            if (GetUnproxiedType(this) != GetUnproxiedType(obj))
            {
                return false;
            }

            var valueObject = (ValueObjectBase)obj;

            return GetEqualityComponents().SequenceEqual(valueObject.GetEqualityComponents());
        }

        public override int GetHashCode()
        {
            if (!_cachedHashCode.HasValue)
            {
                _cachedHashCode = GetEqualityComponents()
                    .Aggregate(1, (current, obj) =>
                    {
                        unchecked
                        {
                            return current * 23 + (obj?.GetHashCode() ?? 0);
                        }
                    });
            }

            return _cachedHashCode.Value;
        }

        private int CompareComponents(object object1, object object2)
        {
            if (object1 is null && object2 is null)
            {
                return 0;
            }

            if (object1 is null)
            {
                return -1;
            }

            if (object2 is null)
            {
                return 1;
            }

            if (object1 is IComparable comparable1 && object2 is IComparable comparable2)
            {
                return comparable1.CompareTo(comparable2);
            }

            return object1.Equals(object2) ? 0 : -1;
        }

        public static bool operator ==(ValueObjectBase a, ValueObjectBase b)
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

        public static bool operator !=(ValueObjectBase a, ValueObjectBase b) => !(a == b);

        internal static Type GetUnproxiedType(object obj)
        {
            const string EFCoreProxyPrefix = "Castle.Proxies.";
            const string NHibernateProxyPostfix = "Proxy";

            var type = obj.GetType();
            var typeString = type.ToString();

            if (typeString.Contains(EFCoreProxyPrefix) ||
                typeString.EndsWith(NHibernateProxyPostfix, StringComparison.InvariantCulture))
            {
                return type.BaseType;
            }

            return type;
        }
    }
}