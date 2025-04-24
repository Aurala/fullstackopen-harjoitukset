const { test, expect, beforeEach, describe } = require('@playwright/test')

const testUser = {
  name: 'Test User',
  username: 'test',
  password: 'testpass'
}

describe('Blogilista app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: testUser
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
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test('User can not log in with invalid credentials', async ({ page }) => {
    await page.getByTestId('username').fill(testUser.username)
    await page.getByTestId('password').fill('thisisnotit')
    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

  test('User can not log in with missing credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
  
    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

  test('User can log in with valid credentials', async ({ page }) => {
    await page.getByTestId('username').fill(testUser.username)
    await page.getByTestId('password').fill(testUser.password)
    await page.getByRole('button', { name: 'login' }).click()  
    await expect(page.getByText(`${testUser.name} logged in successfully`, { exact: true })).toBeVisible()
  })

})
