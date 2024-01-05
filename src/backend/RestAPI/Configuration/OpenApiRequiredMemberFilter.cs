using System;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Conduit.RestAPI.Configuration;

class OpenApiRequiredMemberFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        var nullabilityContext = new NullabilityInfoContext();
        var properties = context.Type.GetProperties();
        foreach (var key in schema.Properties.Keys)
        {
            // Keys that do not correspond to a property are ignored
            var property = properties.SingleOrDefault(
                p => string.Equals(p.Name, key, StringComparison.OrdinalIgnoreCase)
            );
            if (property == null)
                continue;

            // Do not mark if the property is not required
            var required = property.HasAttribute<RequiredMemberAttribute>();
            if (!required)
                continue;

            // Check nullability of non primitive types
            var primitive = schema.Properties[key].Type != null;
            if (!primitive)
            {
                // Do not mark nullable ref types.
                // Ref types cannot be marked as nullable, so this would lead to them being non nullable.
                var nullabilityInfo = nullabilityContext.Create(property);
                if (nullabilityInfo.ReadState == NullabilityState.Nullable)
                    continue;
            }

            schema.Required.Add(key);
        }
    }
}
