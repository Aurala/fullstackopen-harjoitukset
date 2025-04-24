const { test, expect, beforeEach, describe } = require('@playwright/test')

const testUser = {
  name: 'Test User',
  username: 'test',
  password: 'testpass'
}

const testBlogs = [
  {
    title: 'Test Blog 1',
    author: 'Test Author 1',
    url: 'https://testblog.local/1'
  },
  {
    title: 'Test Blog 2',
    author: 'Test Author 2',
    url: 'https://testblog.local/2'
},
  {
    title: 'Test Blog 3',
    author: 'Test Author 3',
    url: 'https://testblog.local/3'
  } 
]

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

  test('User can create a new blog', async ({ page }) => {
    await page.getByTestId('username').fill(testUser.username)
    await page.getByTestId('password').fill(testUser.password)
    await page.getByRole('button', { name: 'login' }).click()  

    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByLabel('title:').fill(testBlogs[0].title)
    await page.getByLabel('author:').fill(testBlogs[0].author)
    await page.getByLabel('url:').fill(testBlogs[0].url)
    await page.getByRole('button', { name: 'create' }).click()

    const blog = await page.locator('.blog').first()
    await expect(blog).toContainText(testBlogs[0].title)
    await expect(blog).toContainText(testBlogs[0].author)
  })

  test('User can see details of a blog', async ({ page }) => {
    await page.getByTestId('username').fill(testUser.username)
    await page.getByTestId('password').fill(testUser.password)
    await page.getByRole('button', { name: 'login' }).click()  
    await expect(page.getByText(`${testUser.name} logged in successfully`, { exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByLabel('title:').fill(testBlogs[0].title)
    await page.getByLabel('author:').fill(testBlogs[0].author)
    await page.getByLabel('url:').fill(testBlogs[0].url)
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'view' }).click()
    const blog = await page.locator('.blog').first()
    await expect(blog).toContainText(testBlogs[0].url)
    await expect(blog).toContainText('0 likes')
    await expect(blog).toContainText(`added by ${testUser.name}`)
  })

  test('User can see like a blog', async ({ page }) => {
    await page.getByTestId('username').fill(testUser.username)
    await page.getByTestId('password').fill(testUser.password)
    await page.getByRole('button', { name: 'login' }).click()  
    await expect(page.getByText(`${testUser.name} logged in successfully`, { exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByLabel('title:').fill(testBlogs[0].title)
    await page.getByLabel('author:').fill(testBlogs[0].author)
    await page.getByLabel('url:').fill(testBlogs[0].url)
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()
    const blog = await page.locator('.blog').first()
    await expect(blog).toContainText('1 likes')
  })

})
