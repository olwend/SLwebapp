const isAdminOrDeveloper = (userInfo, labData) => {
    if (userInfo.userAdmin) {
        return true
    } else {
        if (userInfo.userGroups && userInfo.userGroups.includes('Developer') && labData.userUuid === userInfo.userUuid) {
            return true
        }
    }
    return false
}

export const user = { isAdminOrDeveloper }
