class UserService {
    getUserRole(roles: Array<string>) {
        if(roles.includes('Admin')) {
            return 'Admin'
        } else if (roles.includes('Editor')) {
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

    isAuthorized(reqiredRole: string) {
        const user = this.getCurrentUser()
        if(user) {
            const role = this.getUserRole(user.user.roles)
            if(role) {
                if (role === 'Editor' && reqiredRole === 'Admin') {
                    return false
                } else if(role === 'Viewer' && reqiredRole === 'Editor') {
                    return false
                } else if(role === 'Viewer' && reqiredRole === 'Admin') {
                    return false
                } else {
                    return true
                }
            }
        }
        return false
    }
}

export default new UserService();