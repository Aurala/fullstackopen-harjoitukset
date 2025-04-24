import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testBlog = {
  author: 'Test Author',
  title: 'This is a test title',
  url: 'https://testblogdomain.local',
  likes: 314159265359,
  user: [
    {
      name: 'Test User',
      username: 'testuser',
      id: '67f0e1c07d106a8788ca4402'
    },
  ],
}

describe('Blog component', () => {

  test('Title and author are shown by default', () => {
    render(<Blog blogObject={testBlog} addLike={() => {}} deleteBlog={() => {}} currentUsername="{hessu}"/>)

    const regex = new RegExp(`${testBlog.title}.*${testBlog.author}`)
    const element = screen.getByText(regex)

    expect(element).toBeDefined()
  })

  test('URL and likes are hidden by default', () => {
    render(<Blog blogObject={testBlog} addLike={() => {}} deleteBlog={() => {}} currentUsername="{hessu}"/>)

    const hiddenDiv = document.querySelector('.hidden')
  
    expect(hiddenDiv).not.toBeNull()
    expect(hiddenDiv.textContent).toContain(testBlog.url)
    expect(hiddenDiv.textContent).toContain(testBlog.likes)
  })

  test('URL and likes are shown after the button is clicked', async () => {
    const user = userEvent.setup()

    render(<Blog blogObject={testBlog} addLike={() => {}} deleteBlog={() => {}} currentUsername="{hessu}"/>)

    const button = screen.getByText('view')
    await user.click(button)

    const visibleDiv = document.querySelector('.visible')

    expect(visibleDiv).not.toBeNull()
    expect(visibleDiv.textContent).toContain(testBlog.url)
    expect(visibleDiv.textContent).toContain(testBlog.likes)
  })

  test('Like event handler gets called when the button is pressed', async () => {
    const user = userEvent.setup()
    const mockLikeHandler = vi.fn()

    render(<Blog blogObject={testBlog} addLike={mockLikeHandler} deleteBlog={() => {}} currentUsername="{hessu}"/>)

    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })

})

