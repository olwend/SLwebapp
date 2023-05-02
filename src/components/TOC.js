import React from 'react'

import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import './TOC.css'

const TOC = props => {

    const toc = []

    if (props.slides) {
        props.slides.forEach((slide, index) => {
            slide.split('\n').forEach(line => {
                let trimmedLine = line.trim()
                if (trimmedLine.startsWith('# ')) {
                    toc.push({ position: index + 1, text: trimmedLine.substring(1) })
                }
            })
        })
    }

    return (
        <UncontrolledDropdown direction="up">
            <DropdownToggle caret color="primary" id="dropdown-basic">
                Table of Contents
            </DropdownToggle>

            <DropdownMenu style={{overflow: "none"}}>
                { toc.map( (_, index) =>
                    <DropdownItem key={index} onClick={() => { props.handleJumpTo(_.position) }}>{_.text}</DropdownItem>
                    
                )}
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default TOC
