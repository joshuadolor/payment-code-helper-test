<template>
    <v-container fill-height>
        <v-row justify="center" transition="fade-transition">
            <v-col>
                <div class="text-h2">Select Payment Category</div>
                <v-autocomplete
                    v-model="value"
                    :items="categories"
                    label="Payment Categories"
                    class="my-5"
                ></v-autocomplete>
                <v-btn
                    @click="$emit('selected', value)"
                    :disabled="!value"
                    class="primary"
                    x-large
                    >Submit</v-btn
                >
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { items, getLeaves } from "@/helpers/payment-code";
export default {
    name: "CategorySelector",
    data() {
        return {
            value: "",
        };
    },
    computed: {
        categories() {
            return [...new Set(getLeaves(items).map((item) => item.category))];
        },
    },
};
</script>
