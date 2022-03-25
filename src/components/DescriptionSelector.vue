<template>
    <v-container fill-height>
        <v-row justify="center" transition="fade-transition">
            <v-col>
                <div class="text-h2">Select Payment Type</div>
                <div class="text-subtitle-1 secondary--text">{{ message }}</div>
                <v-autocomplete
                    v-model="value"
                    :items="descriptions"
                    label="Payment Type"
                    class="my-5"
                ></v-autocomplete>
                <v-btn
                    @click="submit"
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
export default {
    name: "DescriptionSelector",
    data() {
        return {
            value: "",
        };
    },
    methods: {
        submit() {
            const item = this.items.find((item) => item.name === this.value);
            this.$emit("selected", item);
            this.value = "";
        },
    },
    props: ["showMessage", "items", "level"],
    computed: {
        descriptions() {
            return [...new Set(this.items.map((item) => item.name))];
        },
        message() {
            if (!this.showMessage) return "";
            if (this.level + 1) return `(${this.level + 1} selections left)`;
            return "";
        },
    },
};
</script>
