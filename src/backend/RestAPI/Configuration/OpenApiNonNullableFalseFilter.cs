using System.Linq;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Conduit.RestAPI;

class OpenApiNonNullableFalseFilter : ISchemaFilter
{
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        if (schema.Properties == null)
        {
            return;
        }

        var requiredButNullableProperties = schema
           .Properties
           .Where(x => x.Value.Nullable)
           .ToList();

        foreach (var property in requiredButNullableProperties)
        {
            property.Value.Nullable = false;
        }
    }
}
