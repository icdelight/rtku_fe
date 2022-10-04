import { DEFAULT_PATHS } from "config.js";
import { store } from "store";

import HomePage from "views/default/Home";
// import HorizontalPage from 'views/Horizontal';
// import VerticalPage from 'views/Vertical';
// import TreePage from 'views/goals/TreeAdmin';
import TreeAdminDetail from "views/goals/treeadmin-detail";
// import TreeView from 'views/goals/TreeView';
import UserSetting from "views/user/UserSetting";
import UpdUser from "views/user/EditUser";
import AreaSetting from "views/area/AreaSetting";
import AddArea from "views/area/AddArea";
import AddRegion from "views/area/AddRegion";
import EditArea from "views/area/EditArea";
import ClusterSettingPage from "views/cluster/ClusterSetting";
import AddCluster from "views/cluster/AddCluster";
import EditCluster from "views/cluster/EditCluster";
import { USER_ROLE } from "constants.js";
import TreeAdminIndex from "views/goals/treeadmin-index";
import TreeAdminUpdate from "views/goals/treeadmin-update";
import TreeAdminAddChild from "views/goals/treeadmin-addchild";
import TreeViewDabeng from "views/goals/treeview-dabeng";
import { setCurrentUser } from "auth/authSlice";

const appRoot = DEFAULT_PATHS.APP.endsWith("/")
  ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length)
  : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/home`,
      roles: [
        USER_ROLE.SuperAdmin,
        USER_ROLE.Admin,
        USER_ROLE.Editor,
        USER_ROLE.Viewer,
      ],
    },
    {
      path: `${appRoot}/home`,
      component: HomePage,
      label: "Home",
      icon: "home",
      roles: [
        USER_ROLE.SuperAdmin,
        USER_ROLE.Admin,
        USER_ROLE.Editor,
        USER_ROLE.Viewer,
      ],
    },
    // {
    //   path: `${appRoot}/horizontal`,
    //   component: HorizontalPage,
    //   label: 'menu.horizontal',
    //   icon: 'grid-2',
    //   roles: [USER_ROLE.Admin],
    // },
    // {
    //   path: `${appRoot}/vertical`,
    //   label: 'menu.vertical',
    //   icon: 'grid-3',
    //   component: VerticalPage,
    //   roles: [USER_ROLE.Admin],
    // },
    {
      path: `${appRoot}/tree`,
      label: "Tree",
      icon: "diagram-1",
      subs: [
        {
          path: `${appRoot}/treeadmin`,
          label: "Tree Admin",
          icon: "settings-1",
          component: TreeAdminIndex,
          roles: [
            USER_ROLE.SuperAdmin,
            USER_ROLE.Admin,
            USER_ROLE.Editor,
            USER_ROLE.Viewer,
          ],
          subs: [
            {
              path: `${appRoot}/addchild`,
              label: "Tree Admin F Child",
              icon: "grid-2",
              component: TreeAdminAddChild,
              roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin, USER_ROLE.Editor],
              hideInMenu: true,
            },
            {
              path: `${appRoot}/:id/detail`,
              label: "Tree Admin Detail",
              icon: "settings-1",
              component: TreeAdminDetail,
              roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin, USER_ROLE.Editor],
              hideInMenu: true,
              // subs: [
              //   {
              //     path: `${appRoot}/addchild`,
              //     label: "Tree Admin F Child",
              //     icon: "grid-2",
              //     component: AddChild,
              //     roles: [
              //       USER_ROLE.SuperAdmin,
              //       USER_ROLE.Admin,
              //       USER_ROLE.Editor,
              //     ],
              //     hideInMenu: true,
              //   },
              // ],
            },
            {
              path: `${appRoot}/:id/update`,
              label: "Update Node",
              icon: "grid-2",
              component: TreeAdminUpdate,
              roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin, USER_ROLE.Editor],
              hideInMenu: true,
            },
            {
              path: `${appRoot}/:id/addchild`,
              label: "Tree Admin F Child",
              icon: "grid-2",
              component: TreeAdminAddChild,
              roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin, USER_ROLE.Editor],
              hideInMenu: true,
            },
          ],
        },
        {
          path: `${appRoot}/treeview`,
          label: "Tree View",
          icon: "board-2",
          component: TreeViewDabeng,
          roles: [
            USER_ROLE.SuperAdmin,
            USER_ROLE.Admin,
            USER_ROLE.Editor,
            USER_ROLE.Viewer,
          ],
        },

        // {
        //   path: `${appRoot}/treeview`,
        //   label: 'Tree View',
        //   icon: 'grid-2',
        //   component: TreeView,
        //   roles: [USER_ROLE.Admin,USER_ROLE.Editor],
        // },
      ],
    },
    {
      path: `${appRoot}/setting`,
      label: "Setting",
      icon: "gear",
      roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin],
      subs: [
        {
          path: `${appRoot}/usersetting`,
          label: "User Setting",
          icon: "user",
          component: UserSetting,
          roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin],
          subs: [
            {
              path: `${appRoot}/upduser`,
              label: "Update User",
              icon: "user",
              component: UpdUser,
              roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin],
              hideInMenu: true,
            },
          ],
        },
        // {
        //   path: `${appRoot}/rolesetting`,
        //   label: 'Role Setting',
        //   icon: 'menu-dashed',
        //   component: UserSetting,
        //   roles: [USER_ROLE.SuperAdmin,USER_ROLE.Admin],
        // },
        {
          path: `${appRoot}/areasetting`,
          label: "Area Setting",
          icon: "flag",
          component: AreaSetting,
          roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin],
          subs: [
            {
              path: `${appRoot}/addarea`,
              label: "Add Area",
              icon: "flag",
              component: AddArea,
              roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin],
              hideInMenu: true,
              subs: [
                {
                  path: `${appRoot}/addregion`,
                  label: "Add Region",
                  icon: "flag",
                  component: AddRegion,
                  roles: [USER_ROLE.SuperAdmin],
                  hideInMenu: true,
                },
              ],
            },
            {
              path: `${appRoot}/editarea`,
              label: "Edit Area",
              icon: "flag",
              component: EditArea,
              roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin],
              hideInMenu: true,
            },
          ],
        },
        {
          path: `${appRoot}/clustersetting`,
          label: "Cluster Setting",
          icon: "bookmark",
          component: ClusterSettingPage,
          roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin],
          subs: [
            {
              path: `${appRoot}/addcluster`,
              label: "Add Cluster",
              icon: "flag",
              component: AddCluster,
              roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin],
              hideInMenu: true,
            },
            {
              path: `${appRoot}/editcluster`,
              label: "Edit Cluster",
              icon: "flag",
              component: EditCluster,
              roles: [USER_ROLE.SuperAdmin, USER_ROLE.Admin],
              hideInMenu: true,
            },
          ],
        },
      ],
    },
    {
      path: `${appRoot}/login`,
      label: "Log out",
      icon: "logout",
      isButton: true,
      onClick: () => {
        store.dispatch(setCurrentUser(""));
      },
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
