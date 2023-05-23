class UserService {
    getUserRole(roleList: Array<string>) {
        if(roleList.includes('Admin')) {
            return 'Admin'
        } else if (roleList.includes('Editor')) {
            return 'Editor'
        } else {
            return 'Viewer'
        }
    }
}

export default new UserService();