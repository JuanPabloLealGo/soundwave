import { ProgressBar } from 'react-loader-spinner'

const Spinner = () => {
  return (
    <ProgressBar
      height="80"
      width="80"
      ariaLabel="progress-bar-loading"
      borderColor='#FF2B66'
      barColor='#FF2B66'
    />
  )
}

export default Spinner