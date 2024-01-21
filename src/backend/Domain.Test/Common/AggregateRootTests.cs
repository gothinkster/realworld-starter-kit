using System;
using System.Collections.Generic;
using Conduit.Domain.Common;
using FluentAssertions;
using Xunit;

namespace Conduit.Domain.Test.Common;

public class AggregateRootTests
{
    [Fact]
    public void DomainEvents_are_empty_after_clear()
    {
        MyAggregate aggregate = new(new MyId(1));
        aggregate.ActionWithEvent();

        aggregate.ClearDomainEvents();

        aggregate.DomainEvents.Should().BeEmpty();
    }

    [Fact]
    public void New_events_are_added_to_domainEvents()
    {
        MyAggregate aggregate = new(new MyId(1));

        aggregate.ActionWithEvent();

        aggregate.DomainEvents.Should().HaveCount(1);
    }

    [Fact]
    public void Valid_rule_doesnt_emit_exception()
    {
        MyAggregate aggregate = new(new MyId(1));

        Action act = () => aggregate.ActionWithValidRule();

        act.Should().NotThrow();
    }

    [Fact]
    public void Broken_rule_emits_exception()
    {
        MyAggregate aggregate = new(new MyId(1));

        Action act = () => aggregate.ActionWithBrokenRule();

        act.Should().Throw<BusinessRuleValidationException>();
    }


    public class MyAggregate : AggregateRoot<MyId>
    {
        public MyAggregate(MyId? id) : base(id)
        {
        }

        public void ActionWithEvent()
        {
            AddDomainEvent(new TestEvent());
        }

        public void ActionWithBrokenRule()
        {
            TestRule brokenRule = new(true);

            CheckRule(brokenRule);
        }

        public void ActionWithValidRule()
        {
            TestRule validRule = new(false);

            CheckRule(validRule);
        }
    }

    public class MyId : ValueObject
    {
        public int Value
        {
            get;
        }

        public MyId(int value)
        {
            Value = value;
        }

        protected override IEnumerable<IComparable?> GetAtomicValues()
        {
            yield return Value;
        }
    }

    public class TestEvent : IDomainEvent
    {
        public Guid Id
        {
            get;
        }
        public DateTime OccurredOn
        {
            get;
        }

        public TestEvent()
        {
            Id = Guid.NewGuid();
            OccurredOn = DateTime.Now;
        }
    }

    public class TestRule : IBusinessRule
    {
        readonly bool _error;

        public TestRule(bool error)
        {
            _error = error;
        }

        public string Message => "Error";

        public bool IsBroken()
        {
            return _error;
        }
    }
}
