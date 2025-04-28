const { test, expect, beforeEach, describe } = require('@playwright/test')

const testUsers = [
  {
    name: 'Test User',
    username: 'test1',
    password: 'testpass',
  },
  {
    name: 'Test User 2',
    username: 'test2',
    password: 'testpass',
  },
  {
    name: 'Test User 3',
    username: 'test3',
    password: 'testpass',
  },
]

const testBlogs = [
  {
    title: 'Test Blog 1',
    author: 'Test Author 1',
    url: 'https://testblog.local/1',
  },
  {
    title: 'Test Blog 2',
    author: 'Test Author 2',
    url: 'https://testblog.local/2',
  },
  {
    title: 'Test Blog 3',
    author: 'Test Author 3',
    url: 'https://testblog.local/3',
  },
]

describe('Blogilista app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: testUsers[0],
    })
    await request.post('http://localhost:3003/api/users', {
      data: testUsers[1],
    })
    await request.post('http://localhost:3003/api/users', {
      data: testUsers[2],
    })
    await page.goto('http://localhost:5173')
  })

  test('Front page can be opened and login form is shown', async ({ page }) => {
    const locator = await page.getByText('log in to blogilista application')
    await expect(locator).toBeVisible()
    await expect(page.getByLabel('username:')).toBeVisible()
    await expect(page.getByLabel('password:')).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'username:' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'password:' })).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  test('User can not log in with invalid credentials', async ({ page }) => {
    await page.getByTestId('username').fill(testUsers[0].username)
    await page.getByTestId('password').fill('thisisnotit')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

  test('User can not log in with missing credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

  test('User can log in with valid credentials', async ({ page }) => {
    await page.getByTestId('username').fill(testUsers[0].username)
    await page.getByTestId('password').fill(testUsers[0].password)
    await page.getByRole('button', { name: 'login' }).click()
    await expect(
      page.getByText(`${testUsers[0].name} logged in successfully`, {
        exact: true,
      })
    ).toBeVisible()
  })

  test('User can log out', async ({ page }) => {
    await page.getByTestId('username').fill(testUsers[0].username)
    await page.getByTestId('password').fill(testUsers[0].password)
    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('button', { name: 'logout' }).click()
    await expect(
      page.getByText('Logged out successfully', { exact: true })
    ).toBeVisible()
  })

  test('User can create a new blog', async ({ page }) => {
    await page.getByTestId('username').fill(testUsers[0].username)
    await page.getByTestId('password').fill(testUsers[0].password)
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
    await page.getByTestId('username').fill(testUsers[0].username)
    await page.getByTestId('password').fill(testUsers[0].password)
    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByLabel('title:').fill(testBlogs[0].title)
    await page.getByLabel('author:').fill(testBlogs[0].author)
    await page.getByLabel('url:').fill(testBlogs[0].url)
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'view' }).click()
    const blog = await page.locator('.blog').first()
    await expect(blog).toContainText(testBlogs[0].url)
    await expect(blog).toContainText('0 likes')
    await expect(blog).toContainText(`added by ${testUsers[0].name}`)
  })

  test('User can like a blog', async ({ page }) => {
    await page.getByTestId('username').fill(testUsers[0].username)
    await page.getByTestId('password').fill(testUsers[0].password)
    await page.getByRole('button', { name: 'login' }).click()

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

  test('User can delete a blog', async ({ page }) => {
    await page.getByTestId('username').fill(testUsers[0].username)
    await page.getByTestId('password').fill(testUsers[0].password)
    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByLabel('title:').fill(testBlogs[0].title)
    await page.getByLabel('author:').fill(testBlogs[0].author)
    await page.getByLabel('url:').fill(testBlogs[0].url)
    await page.getByRole('button', { name: 'create' }).click()

    await page.waitForSelector('.blog')

    var count = await page.locator('.blog').count()
    await expect(count).toBe(1)

    page.on('dialog', (dialog) => dialog.accept())

    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'remove' }).click()

    await expect(page.locator('.blog')).toHaveCount(0, { timeout: 5000 })

    count = await page.locator('.blog').count()
    await expect(count).toBe(0)
  })

  test('User can not the remove button if a blog belongs to someone else', async ({
    page,
  }) => {
    await page.getByTestId('username').fill(testUsers[0].username)
    await page.getByTestId('password').fill(testUsers[0].password)
    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByLabel('title:').fill(testBlogs[0].title)
    await page.getByLabel('author:').fill(testBlogs[0].author)
    await page.getByLabel('url:').fill(testBlogs[0].url)
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'logout' }).click()

    await page.getByTestId('username').fill(testUsers[1].username)
    await page.getByTestId('password').fill(testUsers[1].password)
    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('button', { name: 'view' }).click()

    expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
  })

  test('Blogs are sorted by likes in descending order', async ({ page }) => {
    test.setTimeout(10000)

    await page.getByTestId('username').fill(testUsers[0].username)
    await page.getByTestId('password').fill(testUsers[0].password)
    await page.getByRole('button', { name: 'login' }).click()

    for (let i = 0; i < testBlogs.length; i++) {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByLabel('title:').fill(testBlogs[i].title)
      await page.getByLabel('author:').fill(testBlogs[i].author)
      await page.getByLabel('url:').fill(testBlogs[i].url)
      await page.getByRole('button', { name: 'create' }).click()
      await page.waitForTimeout(500)
    }

    for (let i = 0; i < testBlogs.length; i++) {
      await page.getByRole('button', { name: 'view' }).first().click()
      await page.waitForTimeout(500)
    }

    await page
      .locator(`.blog:has-text("${testBlogs[1].title}")`)
      .getByRole('button', { name: 'like' })
      .click()
    await page
      .locator(`.blog:has-text("${testBlogs[2].title}")`)
      .getByRole('button', { name: 'like' })
      .click()
    await page
      .locator(`.blog:has-text("${testBlogs[1].title}")`)
      .getByRole('button', { name: 'like' })
      .click()

    await expect(
      page.locator(`.blog:has-text("${testBlogs[0].title}")`)
    ).toContainText('0 likes')
    await expect(
      page.locator(`.blog:has-text("${testBlogs[1].title}")`)
    ).toContainText('2 likes')
    await expect(
      page.locator(`.blog:has-text("${testBlogs[2].title}")`)
    ).toContainText('1 likes')

    const blogs = await page.locator('.blog').all()
    await expect(blogs[0]).toContainText(testBlogs[1].title)
    await expect(blogs[1]).toContainText(testBlogs[2].title)
    await expect(blogs[2]).toContainText(testBlogs[0].title)
  })
})
