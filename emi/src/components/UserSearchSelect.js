import React, { useEffect } from 'react';
import Select from 'react-select';
import { emphasize, makeStyles, useTheme } from '@material-ui/core/styles';
import { Typography, TextField, Paper, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import { getRecipients } from '../redux/actions/recipient.actions';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	input: {
		display: 'flex',
		padding: 0,
		height: 'auto',
	},
	valueContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flex: 1,
		alignItems: 'center',
		overflow: 'hidden',
	},
	chip: {
		margin: theme.spacing(0.5, 0.25),
	},
	chipFocused: {
		backgroundColor: emphasize(
			theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
			0.08,
		),
	},
	noOptionsMessage: {
		padding: theme.spacing(1, 2),
	},
	singleValue: {
		fontSize: 16,
	},
	placeholder: {
		position: 'absolute',
		left: 2,
		bottom: 6,
		fontSize: 16,
	},
	paper: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing(1),
		left: 0,
		right: 0,
	},
	divider: {
		height: theme.spacing(2),
	},
}));

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

const UserSearchSelect = ({ getRecipients, recipients, selectedRecipient, setSelectedRecipient }) => {
	const classes = useStyles();
	const theme = useTheme();
	useEffect(() => getRecipients(), []);

	const selectStyles = {
		input: base => ({
			...base,
			color: theme.palette.text.primary,
			'& input': {
				font: 'inherit',
			},
		}),
	};

  return (
    <div className={classes.root}>
		<Select
			classes={classes}
			styles={selectStyles}
			inputId="react-select-single"
			TextFieldProps={{
				label: 'Send to',
				InputLabelProps: {
					htmlFor: 'react-select-single',
					shrink: true,
				}
			}}
			options={recipients}
			components={components}
			value={selectedRecipient}
			onChange={setSelectedRecipient}
		/>
        <div className={classes.divider} />
    </div>
  );
}

const mapStateToProps = state => ({
	recipients: state.recipientReducer.recipients
});

const mapDispatchToProps = {
	getRecipients
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchSelect);