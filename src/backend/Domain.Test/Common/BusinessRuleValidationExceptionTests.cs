using Conduit.Domain.Common;
using FluentAssertions;
using Xunit;

namespace Conduit.Domain.Test.Common;

public class BusinessRuleValidationExceptionTests
{
    [Fact]
    public void Message_of_validationException_is_equal_to_rule_message()
    {
        BusinessRuleValidationException sut = new(new TestRule(true));

        sut.Details.Should().Be("Error");
    }

    [Fact]
    public void ValidationException_contains_rule()
    {
        TestRule brokenRule = new(true);
        BusinessRuleValidationException sut = new(brokenRule);

        sut.BrokenRule.Should().BeSameAs(brokenRule);
    }

    [Fact]
    public void ToString_contains_type_and_message()
    {
        TestRule brokenRule = new(true);
        BusinessRuleValidationException sut = new(brokenRule);

        sut.ToString().Should().Be("Conduit.Domain.Test.Common.BusinessRuleValidationExceptionTests+TestRule: Error");
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
