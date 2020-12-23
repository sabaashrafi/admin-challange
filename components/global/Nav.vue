<template>
  <div>
    <b-navbar toggleable="lg" class="bg-dark" variant="info">
      <b-navbar-brand href="#" class="text-white">
        {{ $t('navbar.title') }}
      </b-navbar-brand>
      <b-navbar-nav class="ml-auto mr-1">
        <b-nav-item href="#">
          <b-button variant="outline-primary">
            {{ $t('navbar.title') }}
          </b-button>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-toggle target="nav-collapse" />
    </b-navbar>
  </div>
</template>
