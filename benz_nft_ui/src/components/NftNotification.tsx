import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { Alert, AlertTitle, AlertColor } from '../lib/mui'
import { GoResponse } from './types'
export const NftNotification = ({
  goResponse,
  type,
}: {
  goResponse: GoResponse | FetchBaseQueryError | SerializedError
  type: AlertColor
}) => {
  let data = ''
  let status = undefined

  if ('status' in goResponse && 'data' in goResponse) {
    // goResponse is of type GoResponse
    const { status: goResponseStatus, data: goResponseData } = goResponse
    data = goResponseData
    status = goResponseStatus
  } else if ('error' in goResponse) {
    // goResponse is of type FetchBaseQueryError or SerializedError
    data = goResponse.error
  } else {
    // Unknown type
    console.log('Invalid goResponse')
  }
  return (
    <Alert severity={type}>
      <AlertTitle>{`${status ?? ''} - ${JSON.stringify(data)}`}</AlertTitle>
    </Alert>
  )
}
