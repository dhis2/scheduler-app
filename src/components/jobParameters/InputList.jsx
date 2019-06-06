import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';

const styles = {
    wrapper: { marginBottom: 16 },
    chip: { margin: 4 },
    chipWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

class InputList extends Component {
    state = {
        input: null,
    };

    onValueAdd = chosenRequest => {
        this.wipeInput();
        this.props.onChange([...this.props.values, chosenRequest]);
    };

    onValueRemove = value => () => {
        this.props.onChange(this.props.values.filter(v => v !== value));
    };

    wipeInput = () => {
        this.setState({ input: '' });
    };

    updateInput = input => {
        this.setState({ input });
    };

    render = () => (
        <div style={styles.wrapper}>
            <AutoComplete
                fullWidth
                searchText={this.state.input}
                dataSource={[]}
                floatingLabelText={this.props.label}
                onUpdateInput={this.updateInput}
                onNewRequest={this.onValueAdd}
            />
            <div style={styles.chipWrapper}>
                {this.props.values.map(value => (
                    <Chip
                        key={value}
                        style={styles.chip}
                        onRequestDelete={this.onValueRemove(value)}
                    >
                        {value}
                    </Chip>
                ))}
            </div>
        </div>
    );
}

export default InputList;
