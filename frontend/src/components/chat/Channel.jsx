import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { selectActiveChannel } from '../../slices/activeChannelSlice'
import { setActive } from '../../slices/activeChannelSlice'
import ChannelMenu from './ChannelMenu'

const Channel = ({ channel }) => {
  const dispatch = useDispatch()
  const activeChannel = useSelector(selectActiveChannel)
  const { id, name, removable } = channel

  const handleChannelChange = () => {
    dispatch(setActive(channel))
  }

  const [showRename, updateShowRename] = useState(false)
  const [showRemove, updateShowRemove] = useState(false)

  const classForChannels = activeChannel?.id === id ? 'w-100 rounded-0 overflow-hidden d-flex align-items-center text-start btn btn-secondary' : 'w-100 rounded-0 overflow-hidden d-flex align-items-center text-start btn'
  const classForButtons = activeChannel?.id === id ? 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn btn-secondary' : 'flex-grow-0 dropdown-toggle dropdown-toggle-split btn'

  if (removable) {
    return (
      <li className="nav-item w-100" key={id} onClick={handleChannelChange}>
        <div role="group" className="d-flex dropdown btn-group">
          <button type="button" className={classForChannels}>
            <span className="me-1">#</span>
            <span className="flex-grow-1 text-truncate min-w-0">
              {name}
            </span>
          </button>
          <ChannelMenu
            classForButtons={classForButtons}
            channel={channel}
            modals={{
              showRename, updateShowRename,
              showRemove, updateShowRemove,
            }}
          />
        </div>
      </li>
    )
  }
  return (
    <li className="nav-item w-100" key={id} onClick={handleChannelChange}>
      <button type="button" className={classForChannels}>
        <span className="me-1">#</span>
        <span className="flex-grow-1 text-truncate min-w-0">
          {name}
        </span>
      </button>
    </li>
  )
}

export default Channel
