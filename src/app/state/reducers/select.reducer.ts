// import { createReducer, Action, on} from "@ngrx/store";
// import { StationCollection } from "src/app/models/dataInterfaces";
// import { selectRoute } from "../actions/select.actions";

// export interface State{
//     activeLine: StationCollection | null
// }

// export const initialState: State = {
//     activeLine:  null
// }

// export const reducer = createReducer(
//     initialState,
//     on(selectRoute, (state: any, action: any): State=>{
//         return{
//             ...state,
//             activeLine: action
//         }
//     })
// )


// /* selectors */
// export const getAllSelector = (state: State) => state.activeLine