import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { connectStartEvent } from "../actions/index"
import EntryPage from "../components/pages/EntryPage"

const mapStateToProps = (state)=> ({
  entryState: state.entryState
})

const mapDispatchToProps = (dispatch) => ({
  onEntryButtonClick: (id, name, nextPage) => {
   dispatch(connectStartEvent(id, name, nextPage))
  }
})
const EntryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryPage)

export default withRouter(EntryContainer)