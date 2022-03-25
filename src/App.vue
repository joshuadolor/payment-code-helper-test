<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <span class="title">Payment Code Helper</span>
            </div>

            <v-spacer></v-spacer>
        </v-app-bar>

        <v-main>
            <PaymentCodeSelector />
        </v-main>
    </v-app>
</template>

<script>
import PaymentCodeSelector from "./components/PaymentCodeSelector";

export default {
    name: "App",

    components: {
        PaymentCodeSelector,
    },

    data: () => ({
        //
    }),
};
</script>
