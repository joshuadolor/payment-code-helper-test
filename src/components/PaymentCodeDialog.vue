<template>
    <v-dialog :value="show" width="500" @click:outside="$emit('close')">
        <v-card>
            <v-card-title class="text-h5"> Payment Code </v-card-title>

            <v-card-text>
                <slot />
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="$emit('close')" text>
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "PaymentCodeDialog",
    props: ["show"],
};
</script>

<style>
</style>