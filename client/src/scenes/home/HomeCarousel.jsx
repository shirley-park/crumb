import { Box, IconButton } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
// import { shades } from '../../theme'

// import all images from assets folder
const importAll = (r) =>
  r.keys().reduce((images, item) => {
    images[item.replace('./', '')] = r(item)
    return images
  }, {})

export const heroTextureImports = importAll(
  require.context('../../assets', false, /\.(png|jpe?g|svg)$/)
)

const HomeCarousel = () => {
  // const isNonMobile = useMediaQuery('(min-width:600px)')
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '20%',
            color: 'gray',
            padding: '5px',
            zIndex: '10',
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '20%',
            color: 'gray',
            padding: '5px',
            zIndex: '10',
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: '100%',
              height: '600px',
              marginTop: '125px',
              objectFit: 'contain',
              backgroundAttachment: 'fixed',
            }}
          />
        </Box>
      ))}
    </Carousel>
  )
}

export default HomeCarousel
