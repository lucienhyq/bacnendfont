<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children, item)">
      <el-menu-item
        :class="{ 'submenu-title-noDropdown': !isNest }"
        @click="tapClick(item)"
      >
        <item :icon="item.meta.icon" :title="item.meta.title" />
      </el-menu-item>
    </template>
    <template v-else-if="item.meta.hidden"> </template>
    <el-submenu v-else :index="toasix" ref="subMenu" popper-append-to-body>
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :indexS="child.path"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import Item from "./Item";

export default {
  name: "SidebarItem",
  components: { Item },
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    indexS: {
      type: String,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  computed: {
    toasix() {
      return String(this.indexS);
    },
  },
  methods: {
    tapClick(item) {
      console.log(item.name, this.$route);
      // if (this.$route.name == item.name) {
      //   return;
      // }
      try {
        this.$router.push({ name: `${item.name}` });
      } catch (error) {}
    },
    hasOneShowingChild(children = [], parent) {
      if (parent.meta.hidden) {
        return false;
      }
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      console.log(routePath);
      // return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
