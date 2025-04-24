const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blogilista app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Test User',
        username: 'test',
        password: 'testpass'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Front page can be opened and login form is shown', async ({ page }) => {

    const locator = await page.getByText('log in to blogilista application')
    await expect(locator).toBeVisible()
    await expect(page.getByLabel('username:')).toBeVisible()
    await expect(page.getByLabel('password:')).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'username:' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'password:' })).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  })

})
