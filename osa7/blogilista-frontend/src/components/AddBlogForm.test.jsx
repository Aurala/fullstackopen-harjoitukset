import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

const testBlog = {
  author: 'Test Author',
  title: 'This is a test title',
  url: 'https://testblogdomain.local',
  likes: 314159265359,
  user: [
    {
      name: 'Test User',
      username: 'testuser',
      id: '67f0e1c07d106a8788ca4402',
    },
  ],
}

describe('AddBlogForm component', () => {
  test('Add event handler gets called with the right parameters when the button is pressed', async () => {
    const user = userEvent.setup()
    const mockAddHandler = vi.fn()

    render(<AddBlogForm addBlog={mockAddHandler} />)

    const titleInput = screen.getByLabelText('title:')
    const authorInput = screen.getByLabelText('author:')
    const urlInput = screen.getByLabelText('url:')

    await user.type(titleInput, testBlog.title)
    await user.type(authorInput, testBlog.author)
    await user.type(urlInput, testBlog.url)

    const submitButton = screen.getByText('create')
    await user.click(submitButton)

    expect(mockAddHandler.mock.calls).toHaveLength(1)
    expect(mockAddHandler.mock.calls[0][0].title).toBe(testBlog.title)
    expect(mockAddHandler.mock.calls[0][0].author).toBe(testBlog.author)
    expect(mockAddHandler.mock.calls[0][0].url).toBe(testBlog.url)
  })
})
