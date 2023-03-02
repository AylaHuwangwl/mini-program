import { HYEventStore } from 'hy-event-store'
import { getPlaylistDetail } from "../services/music"
// 123
export const rankingsMap = {
  originRanking: 3779629,
  newRanking: 2884035,
  upRanking: 19723756
}

const rankingStore = new HYEventStore({
  state:{
    originRanking: {},
    newRanking: {},
    upRanking: {}
  },
  actions:{
    fetchRankingDataAction(ctx) {
        for (const key in rankingsMap) {
          const id = rankingsMap[key]
          getPlaylistDetail(id).then(res => {
            ctx[key] = res.playlist
          })
        }
      }
  }
})
export default rankingStore