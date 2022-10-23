namespace Conduit.Core.Common
{
    public interface IEntity<out TId>
    {
        TId Id { get; }
    }
}