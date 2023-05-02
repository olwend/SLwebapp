import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { ChevronRightIcon, ChevronLeftIcon } from '@primer/octicons-react'

// Import redux
import { useDispatch, useSelector } from 'react-redux'
import { getSession } from '../redux/slices/sessionSlice'
import { setCurrentSlide } from '../redux/slices/sessionSlice'

// Import reactstrap
import { Container, Row, Col, Button, Progress, Input } from 'reactstrap'

// Import components
import TOC from '../components/TOC'
import config from '../config'

// Import CSS
import './Slides.css'

const Slides = props => {

    const AWS_BUCKET_URL = `https://${config.s3.BUCKET}.s3-${config.s3.REGION}.amazonaws.com/public/`

    const dispatch = useDispatch()

    const session = useSelector(getSession)

    const [ current, setCurrent ] = useState(session.currentSlide)
    const [ slides, setSlides ]= useState([])
    const [ fontSize, setFontSize ] = useState(18)

    useEffect(() => {
      setSlides(props.readme.trim().split("---"))
      return () => dispatch(setCurrentSlide(current))
    }, [current, dispatch, props.readme])

    const handleChangeClickNext = () => { if (current < slides.length) setCurrent(current + 1)}

    const handleChangeClickPrev = () => { if (1 < current) setCurrent(current - 1)}

    const handleKeyUpJumpTo = event => {
      const parsedValue = parseInt(event.target.value)
      if (event.key === 'Enter' || event.keyCode === 13) {
          if ((parsedValue >= 1) && (parsedValue <= slides.length) && !isNaN(parsedValue)) {
            setCurrent(parsedValue)
            event.target.value = ''
          } else {
            event.target.value = current
          }
      }
    }

    const handleKeyUpFontSize = event => {
        const parsedValue = parseInt(event.target.value)
        if (event.key === 'Enter' || event.keyCode === 13) {
            if ((parsedValue >= 1) && !isNaN(parsedValue)) {
                setFontSize(parsedValue)
                event.target.value = ''
            } else {
                event.target.value = current
            }
        }
    }

    const handleKeyDown = event => {
        switch (event.keyCode) {
            case 37:
                handleChangeClickPrev()
                break
            case 39:
                handleChangeClickNext()
                break
            default:
        }
    }

    const handleJumpTo = _ => setCurrent(_)

    return (
      <Container
        className="container-fluid d-flex flex-column align-items-center justify-content-center p-0 h-100"
        fluid
      >
        <Row className="w-100 markdown flex-fill" md={12}>
          <Col
            className="slides align-items-center justify-content-center m-0"
            style={{ fontSize: fontSize }}
          >
            <ReactMarkdown
              source={slides ? slides[current - 1] : ""} // eslint-disable-next-line
              renderers={{
                image: (props) => (
                  <img
                    {...props}
                    alt=""
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ),
              }}
              transformImageUri={(uri) =>
                uri.startsWith("http" || "https")
                  ? uri
                  : uri.startsWith("/")
                  ? `${AWS_BUCKET_URL}${session.session.labId}${uri}`.toLowerCase()
                  : `${AWS_BUCKET_URL}${session.session.labId}/${uri}`.toLowerCase()
              }
            />
          </Col>
        </Row>

        <div className="progressBar d-flex flex-row align-items-center justify-content-center p-2 w-100">
          <div className="px-2">
            <TOC slides={slides} handleJumpTo={handleJumpTo} />
          </div>
          <div className="fontSizeContainer align-items-center justify-content-center d-flex px-2">
            <label className="m-0">Font Size</label>
            <Input
              placeholder={fontSize}
              onKeyUp={handleKeyUpFontSize}
            />
          </div>
          <div className="progress-container progress-primary px-3 flex-fill">
            <Progress animated min={0} max={slides.length} value={current}>
              <span className="progress-value pr-3">{`${current} / ${slides.length}`}</span>
            </Progress>
          </div>

          <div className="jumpToContainer align-items-center justify-content-center d-flex px-2">
            <label className="m-0">Go to</label>
            <Input
              placeholder={current}
              onKeyUp={handleKeyUpJumpTo}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div>
            <Button
              className="p-2 btn-link"
              style={{color:"#f96332"}}
              color="info"
              onClick={handleChangeClickPrev}
            >
              <ChevronLeftIcon size={30} />
            </Button>
            <Button
              className="p-2 btn-link"
              style={{color:"#f96332"}}
              color="info"
              onClick={handleChangeClickNext}
            >
              <ChevronRightIcon size={30} />
            </Button>
          </div>
        </div>
      </Container>
    );
}

export default Slides
