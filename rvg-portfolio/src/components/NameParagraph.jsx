import React from 'react';
import { Transition } from '@headlessui/react'
import classnames from 'classnames'



const textArray = ['Game Developer', 'Passionate Programmer', 'AI Enthousiast', 'Coffee Addict', 'Challenge Seeker']
const timeUntilLeave = 1000;


class NameParagraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            textIdx: 0,
            textAnimation: true //Has to be true for the first state!
        };
        this.changeText = this.changeText.bind(this);
    }

    changeText() {
        let newIdx = this.state.textIdx;
        this.setState({ textIdx: [++newIdx === textArray.length ? 0 : newIdx] });
        this.setState({ textAnimation: true })
    }

    render()
    {
        const text = textArray[this.state.textIdx]
        return (
            <div className={classnames(this.props.className, 'flex justify-center mx-auto text-white text-lg mt-4')}>
                <div>-</div>
                <div className='w-52'>
                    <Transition as='p'
                        appear={true}
                        unmount={false}
                        show={this.state.textAnimation}
                        enter="transition-{opacity, transform}} duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        afterEnter={() => {setTimeout(() => {this.setState({textAnimation: false}); }, timeUntilLeave)}}
                        leave="transition-{opacity, transform}} duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={this.changeText}
                        >
                        {text}
                    </Transition>
                </div>
                <div>-</div>
            </div>
        )
    }
}

export default NameParagraph;