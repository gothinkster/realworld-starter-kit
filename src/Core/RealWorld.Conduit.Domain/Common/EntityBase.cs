namespace Conduit.Core.Common
{
    public abstract class EntityBase : IEntity<Guid>
    {
        public Guid Id { get; }

        protected EntityBase()
        {
            Id = Guid.NewGuid();
        }
    }

    public abstract class EntityBase<TId> : IEntity<TId>
    {
        public TId Id => default!;
    }
}