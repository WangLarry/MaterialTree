import React from "react";
import PropTypes from "prop-types";
import SvgIcon from "@material-ui/core/SvgIcon";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import Collapse from "@material-ui/core/Collapse";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon className="close" fontSize="inherit" {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
    }
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool
};

const SearchInput = ({ classes }) => (
  <div className={classes.root}>
    <div className={classes.searchIcon}>
      <SearchIcon />
    </div>
    <InputBase
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput
      }}
      inputProps={{ "aria-label": "search" }}
    />
  </div>
);
const StyledSearchInput = withStyles(theme => ({
  root: {
    flex: 1,
    position: "relative",
    borderRadius: theme.shape.borderRadius,

    width: "100%"
  },
  searchIcon: {
    width: theme.spacing(5),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(1.5, 1, 1.5, 5),
    transition: theme.transitions.create("width"),
    width: "100%",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.1)
    }
  }
}))(props => <SearchInput {...props} />);

const Toolbar = ({ classes }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <StyledSearchInput />
      <IconButton
        aria-label="delete"
        className={classes.button}
        size="small"
        onClick={handleClick}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Create Item</MenuItem>
        <MenuItem onClick={handleClose}>Edit Item</MenuItem>
        <MenuItem onClick={handleClose}>Delete Item</MenuItem>
      </Menu>
    </div>
  );
};
const StyledToolbar = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  button: {
    color: "inherit",
    marginRight: theme.spacing(0.5)
  }
}))(props => <Toolbar {...props} />);

const StyledTreeItem = withStyles(theme => ({
  root: {
    "&:focus > $content:before": {
      backgroundColor: fade(theme.palette.primary.main, 0.2),
      display: "inherit",
    },
    "&:focus > $content": {
      backgroundColor: "transparent",
    }
  },
  iconContainer: {
    "& .close": {
      opacity: 0.3
    },
    marginRight: "8px"
  },
  group: {
    marginLeft: 12,
    paddingLeft: 12,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`
  },
  label: {
    lineHeight: "2em",
    whiteSpace: "nowrap"
  },
  content: {
    position: "relative",

    "&::before": {
      display: "none",
      content: "''",
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      color: "white",
      height: "100%",
      width: "200%",
      marginLeft: "-100%",
      position: "absolute",
      zIndex: -1
    },
    "&:hover": {
      backgroundColor: "transparent"
    },
    "&:hover::before": {
      display: "inherit"
    }
  }
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > * ": {
      marginBottom: theme.spacing(1)
    },
    margin: "100px",
    maxWidth: 400,
    height: 700
  },
  tree: {
    paddingLeft: theme.spacing(1),
    flexGrow: 1,

    overflowX: "hidden"
  }
}));

export default function CustomizedTreeView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledToolbar />
      <TreeView
        className={classes.tree}
        defaultExpanded={["1"]}
        defaultCollapseIcon={<MinusSquare />}
        defaultExpandIcon={<PlusSquare />}
        defaultEndIcon={<CloseSquare />}
      >
        <StyledTreeItem nodeId="1" label="Main">
          <StyledTreeItem nodeId="2" label="Hello" />
          <StyledTreeItem nodeId="3" label="Subtree with children">
            <StyledTreeItem nodeId="6" label="Hello" />
            <StyledTreeItem nodeId="7" label="Sub-subtree with children">
              <StyledTreeItem nodeId="9" label="Child 1" />
              <StyledTreeItem nodeId="10" label="Child 2" />
              <StyledTreeItem nodeId="11" label="Child 3" />
            </StyledTreeItem>
            <StyledTreeItem nodeId="8" label="Hello" />
          </StyledTreeItem>
          <StyledTreeItem nodeId="4" label="World" />
          <StyledTreeItem nodeId="5" label="Something something" />
        </StyledTreeItem>
      </TreeView>
    </div>
  );
}
