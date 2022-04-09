import { Given } from '@cucumber/cucumber'

Given("I'm viewing the admin settings", async function () {
  this.login('administrator')
  this.page.navigateTo('/admin/settings')
})
