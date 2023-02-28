import {hyRequest} from './index'
// offset是偏移数量
export function getMusicBanner(type = 0){
    return hyRequest.get({
        url: "/banner",
        data: {
          type
        }
      })
}