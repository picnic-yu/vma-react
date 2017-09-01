import * as React from 'react';

export interface Props {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
}

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

// function Hello(props: Props) {
//     let enthusiasmLevel = props.enthusiasmLevel || 0;
//     if (enthusiasmLevel <= 0) {
//       throw new Error('You could be a little more enthusiastic. :D');
//     }
  
//     return (
//       <div className="hello">
//         <div className="greeting">
//           Hello {props.name + getExclamationMarks(enthusiasmLevel)}
//         </div>
//         <div>
//           <button onClick={props.onDecrement}>-</button>
//           <button onClick={props.onIncrement}>+</button>
//         </div>
//       </div>
//     );
//   }

// function Hello({ name, enthusiasmLevel = 1, onIncrement, onDecrement }: Props) {
//     if (enthusiasmLevel <= 0) {
//       throw new Error('You could be a little more enthusiastic. :D');
//     }
  
//     return (
//       <div className="hello">
//         <div className="greeting">
//           Hello {name + getExclamationMarks(enthusiasmLevel)}
//         </div>
//         <div>
//           <button onClick={onDecrement}>-</button>
//           <button onClick={onIncrement}>+</button>
//         </div>
//       </div>
//     );
//   }

export class Hello extends React.Component<Props, object> {
    // constructor(props: Props) {
    //     super(props)
    // }
    render() {
      const { name, enthusiasmLevel = 1 } = this.props;
  
      if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
      }
  
      return (
        <div className="hello">
          <div className="greeting">
            Hello {name + getExclamationMarks(enthusiasmLevel)}
          </div>
          <div>
            <button onClick={this.props.onDecrement}>-</button>
            <button onClick={this.props.onIncrement}>+</button>
          </div>
        </div>
      );
    }
  }

// export default Hello;
  