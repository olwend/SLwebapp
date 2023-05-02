export const categoryOptions = [
    { value: 'containerisation', label: 'Containerisation' },
    { value: 'infrastructureascode', label: 'Infrastructure-as-Code' },
    { value: 'configmanagement', label: 'Config Management' },
    { value: 'sourcecontrol', label: 'Source Control' },
    { value: 'cloud', label: 'Cloud' },
    { value: 'monitoring', label: 'Monitoring' },
    { value: 'database', label: 'Database' },
    { value: 'testing', label: 'Testing' },
    { value: 'security', label: 'Security' },
    { value: 'continuousintegration', label: 'Continuous Integration' },
    { value: 'releasemanagement', label: 'Release Management' },
    { value: 'serverless', label: 'Serverless' },
    { value: 'artifactmanagement', label: 'Artifact Management' },
    { value: 'programming', label: 'Programming' },
    { value: 'scripting', label: 'Scripting' },
]

export const resourceOptions = [
    { value:'256:512', label:'256 / 512 : (vCPU; units) / (Memory; MiB)' },
    { value:'256:1024', label:'256 / 1024 : (vCPU; units) / (Memory; MiB)' },
    { value:'256:2048', label:'256 / 2048 : (vCPU; units) / (Memory; MiB)' },
    { value:'512:1024', label:'512 / 1024 : (vCPU; units) / (Memory; MiB)' },
    { value:'512:2048', label:'512 / 2048 : (vCPU; units) / (Memory; MiB)' },
    { value:'512:3072', label:'512 / 3072 : (vCPU; units) / (Memory; MiB)' },
    { value:'1024:2048', label:'1024 / 2048 : (vCPU; units) / (Memory; MiB)' },
    { value:'1024:3072', label:'1024 / 3072 : (vCPU; units) / (Memory; MiB)' }
]

export const timerOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '60 minutes' },
    { value: '90', label: '90 minutes' },
    { value: '120', label: '120 minutes' },
    { value: '150', label: '150 minutes' },
    { value: '180', label: '180 minutes' }
]

export const groupsOptions = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Developer', label: 'Developer' },
]