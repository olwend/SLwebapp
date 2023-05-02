import { isUrlAvailable } from './http'

const REFRESH_FREQUENCY_IN_SGS = 15 * 1000
const REFRESH_MAX_NUMBER = 12

export const populateTabs = sessionInfo => {
    const tabs = []
    try {
        const containerDefinition = sessionInfo.session.cDef
        containerDefinition.map(containerDefinition =>
            containerDefinition.ports.map((a, i) => a.visible ? tabs.push(
                {
                    key: i,
                    shortName: containerDefinition.shortName,
                    port: a.port,
                    url: 'https://' + sessionInfo.session.uuid + '-' + containerDefinition.shortName + a.port + '.sessions.' + process.env.REACT_APP_URL,
                    available: false
                }) : ''))
    } catch { }
    return tabs
}

export const populateBaseTabs = sessionInfo => {
    const tabs = []
    try {
        sessionInfo.session.basePorts.map((a, i) => a.visible ? tabs.push(
            {
                key: i,
                port: a.port,
                url: 'https://' + sessionInfo.session.uuid + '-base' + a.port + '.sessions.' + process.env.REACT_APP_URL,
                available: false
            }) : '')
    } catch { }
    return tabs
}

const populateUrls = sessionInfo => {
    const urls = []
    try {
        const containerDefinition = sessionInfo.session.cDef
        containerDefinition.map(containerDefinition =>
            containerDefinition.ports.map((a, i) => a.visible ?
                urls.push('https://' + sessionInfo.session.uuid + '-' + containerDefinition.shortName + a.port + '.sessions.' + process.env.REACT_APP_URL) : ''))
    } catch { }
    return urls
}

const populateBaseUrls = sessionInfo => {
    const urls = []
    try {
    sessionInfo.session.basePorts.map((a, i) => a.visible ?
        urls.push('https://' + sessionInfo.session.uuid + '-base' + a.port + '.sessions.' + process.env.REACT_APP_URL) : '')
    } catch {}
    return urls
}

const checkUrlInAvailabilityList = (url, urlAvailability) => {
    let result = false
    urlAvailability.map(_ => _.url === url ? result = _.isAvailable : '')
    return result
}

const refresh = async (tab, index, currentRefreshNumber, tabs, setTabs, isDelayedRefreshAlreadyActivated) => {
    let available
    if (currentRefreshNumber !== REFRESH_MAX_NUMBER) {
        available = await isUrlAvailable(tab.url)
        if (!available)
            prepareRefresh(isDelayedRefreshAlreadyActivated, currentRefreshNumber, tabs, setTabs)
    } else {
        available = true
    }
    const updatedTabs = []
    tabs.map(_ => updatedTabs.push(_))
    updatedTabs[index].available = available
    setTabs(updatedTabs)
}

const prepareRefresh = (isDelayedRefreshAlreadyActivated, currentRefreshNumber, tabs, setTabs) => {
    if (!isDelayedRefreshAlreadyActivated) {
        setTimeout(() => {
            isDelayedRefreshAlreadyActivated = false
            tabs.map((value, index) => !value.available ? refresh(value, index, currentRefreshNumber, tabs, setTabs, isDelayedRefreshAlreadyActivated) : '')
            currentRefreshNumber++
        }, REFRESH_FREQUENCY_IN_SGS)
        isDelayedRefreshAlreadyActivated = true
    }
}

export const labsFetchData = (sessionInfo, tabs, setTabs, isDelayedRefreshAlreadyActivated, currentRefreshNumber) =>
    fetchData(sessionInfo, tabs, setTabs, isDelayedRefreshAlreadyActivated, currentRefreshNumber, populateUrls(sessionInfo), populateTabs)

export const baseFetchData = (sessionInfo, tabs, setTabs, isDelayedRefreshAlreadyActivated, currentRefreshNumber) =>
    fetchData(sessionInfo, tabs, setTabs, isDelayedRefreshAlreadyActivated, currentRefreshNumber, populateBaseUrls(sessionInfo), populateBaseTabs)


const fetchData = async (sessionInfo, tabs, setTabs, isDelayedRefreshAlreadyActivated, currentRefreshNumber, urls, populateTabsFunction) => {
    const urlAvailability = await Promise.all(urls.map(async url => {
        const isAvailable = await isUrlAvailable(url)
        if (!isAvailable && currentRefreshNumber <= REFRESH_MAX_NUMBER)
            prepareRefresh(isDelayedRefreshAlreadyActivated, currentRefreshNumber, tabs, setTabs)
        return ({ url, isAvailable })
    }))
    const newTabs = populateTabsFunction(sessionInfo)
    newTabs.map(_ => _.available = checkUrlInAvailabilityList(_.url, urlAvailability))
    setTabs(newTabs)
}
