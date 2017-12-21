import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';

const styles = {
    chip: { margin: 4 },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

class InputList extends Component {
    state = {
        input: null,
    };

    wipeInput = () => {
        this.setState({ input: '' });
    };
    updateInput = input => {
        this.setState({ input });
    };

    onValueAdd = chosenRequest => {
        this.wipeInput();
        this.props.onChange([...this.props.values, chosenRequest]);
    };

    onValueRemove = value => () => {
        this.props.onChange(this.props.values.filter(v => v !== value));
    };

    render = () => (
        <div style={{ marginBottom: 16 }}>
            <AutoComplete
                fullWidth
                searchText={this.state.input}
                dataSource={[]}
                floatingLabelText={this.props.label}
                onUpdateInput={this.updateInput}
                onNewRequest={this.onValueAdd}
            />

            <div style={styles.wrapper}>
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
