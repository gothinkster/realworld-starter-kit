import { component$, Resource } from "@builder.io/qwik"
import { DocumentHead, EndpointHandler, useEndpoint } from "@builder.io/qwik-city"
import * as api from "~/libs/api"
import { components } from "~/libs/api-schema"
import { getSession } from "~/libs/getSession"
import { Form, getFormData } from "./_form"

export interface EndpointData {
  article: components["schemas"]["Article"]
}

export const onGet: EndpointHandler<EndpointData> = async ({
  request,
  response,
  params,
}) => {
  const { user } = getSession(request.headers.get("cookie"))
  if (!user) {
    response.redirect('/login', 302);
    return
  }
  const { article } = await api.get(`articles/${params.slug}`)
  // FIXME: check if article author is current user
  return {
    user,
    article,
  }
}

export const onPut: EndpointHandler = async ({ params, request, response }) => {
  const formData = await request.formData()
  const { user } = getSession(request.headers.get('cookie'))
  if (!user) {
    response.redirect('/login', 302);
    return
  }
  const result = await api.put(`articles/${params.slug}`, {
    article: getFormData(formData),
  }, user.token)

  if (result.errors) {
    // TODO: error not consumed yet
		return { errors: result.errors };
	}
  response.redirect(`article/${result.article.slug}`, 302)
}

export default component$(() => {
  const resource = useEndpoint<typeof onGet>()
  return (
    <Resource resource={resource} onResolved={({ article }) => {
      return (
        <Form method='put' article={article} />
      )
    }} />
  )
})

export const head: DocumentHead = {
  title: "Editor -- Conduit",
}
