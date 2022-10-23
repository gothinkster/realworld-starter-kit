namespace Conduit.Core.Common
{
    public abstract class EntityBase : IEntity<Guid>
    {
        protected EntityBase()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; }
    }

    public abstract class EntityBase<TId> : IEntity<TId>
    {
        public TId Id => default!;
    }
}