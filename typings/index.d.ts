import { Observable } from 'rxjs/Observable'
import * as React from 'react'

type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T]
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>

declare namespace Rxan {
  type AutoStartableLifeCycle =
    | 'nothing'
    | 'constructor'
    | 'componentDidMount'
    | 'componentWillUpdate'
    | 'componentDidUpdate'
  ;

  interface RxanReactOptions<V, AP extends object> {
    /**
     * @desc
     * Auto start observable when specified lifecycle method called.
     */
    autoStartAt?: AutoStartableLifeCycle
    /**
     * @desc
     * Whether stop or does not before auto start.
     */
    stopBeforeAutoStart?: boolean
    /**
     * @desc
     * Maps value, start, stop to props
     */
    mapAnimationToProps?: (value: V, start: () => void, stop: () => void) => AP
  }

  /**
   * @desc
   * V stands for value, and
   * AP stands for animation props.
   */
  const withRxan: <V, AP extends object>(value$: Observable<V>, config?: RxanReactOptions<V, AP>) =>
    <P extends AP>(C: React.ComponentType<P>) =>
    React.ComponentClass<Omit<P, keyof AP>>
}

export = Rxan
