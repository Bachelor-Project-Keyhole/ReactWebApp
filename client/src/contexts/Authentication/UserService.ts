class UserService {
  getUserRole (roleList: string[]) {
    if (roleList.includes('Admin')) {
      return 'Admin'
    } else if (roleList.includes('Editor')) {
      return 'Editor'
    } else {
      return 'Viewer'
    }
  }

  getCurrentUser = () => {
    const userStr = localStorage.getItem('user')
    if (userStr) return JSON.parse(userStr)
    return null
  }
}

export default new UserService()
