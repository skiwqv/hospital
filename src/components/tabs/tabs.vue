<template>
  <div class="tabs">
    <div class="tab-buttons">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTab = index"
        class="tab-button"
        :class="{ active: selectedTab === index }"
      >
        <component :is="tab.icon" class="tab-icon" />
        {{ tab.label }}
      </button>
      <div class="tab-text">View All</div>
    </div>
    <Transition name="fade" mode="out-in">
      <div :key="selectedTab" class="tab-content">
        <h2 class="content-title">{{ tabs[selectedTab].content.title }}</h2>
        <ul class="content-list">
          <li
            v-for="(item, index) in tabs[selectedTab].content.list"
            :key="index"
            class="content-list-item"
          >
            <span class="list-circle"></span>
            {{ item.text }}
          </li>
        </ul>
        <p class="content-paragraph">
          {{ tabs[selectedTab].content.paragraph }}
        </p>
      </div>
    </Transition>
    <div class="tabs-images">
      <img
        class="tab-image"
        src="@/assets/images/service2.png"
        alt="service image"
      />
      <img
        class="tab-image"
        src="@/assets/images/service1.png"
        alt="service image"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, markRaw } from "vue";
import tab1 from "@/assets/icons/tab1.svg";
import tab2 from "@/assets/icons/tab2.svg";
import tab3 from "@/assets/icons/tab3.svg";
import tab4 from "@/assets/icons/tab4.svg";

const tabIcons = {
  tab1: markRaw(tab1),
  tab2: markRaw(tab2),
  tab3: markRaw(tab3),
  tab4: markRaw(tab4),
};

const tabs = ref([
  {
    label: "Free Checkup",
    content: {
      title: "A passion for putting patients first.",
      list: [
        { text: "Check blood pressure" },
        { text: "Consult a specialist" },
        { text: "Basic blood tests" },
        { text: "Review medical history" },
        { text: "Body mass index (BMI)" },
        { text: "Health tips for daily habits" },
      ],
      paragraph:
        "At our clinic, we prioritize every patient's health and well-being. Our free checkup services are designed to identify potential health issues early on. By providing personalized advice and professional care, we aim to help you maintain a healthy lifestyle. Whether it's regular monitoring or an initial consultation, our team is here to support you at every step of your health journey.",
    },
    icon: tabIcons.tab1,
  },
  {
    label: "Cardiogram",
    content: {
      title: "Heart health is our priority.",
      list: [
        { text: "Full heart checkup" },
        { text: "Echocardiogram" },
        { text: "Stress test" },
        { text: "24-hour Holter monitoring" },
        { text: "ECG analysis" },
        { text: "Cardiologist consult" },
      ],
      paragraph:
        "Your heart is one of the most vital organs, and keeping it in good shape is essential. Our cardiogram services help assess heart health and detect any irregularities early. With advanced equipment and experienced cardiologists, we provide comprehensive heart checkups. Regular cardiograms are crucial, especially if you have a family history of heart disease or experience any heart-related symptoms.",
    },
    icon: tabIcons.tab2,
  },
  {
    label: "DNA Testing",
    content: {
      title: "Unlock your genetic potential.",
      list: [
        { text: "Gene analysis" },
        { text: "Ancestry insights" },
        { text: "Disease predisposition" },
        { text: "Inherited traits" },
        { text: "DNA-based health plan" },
        { text: "Geneticist consult" },
      ],
      paragraph:
        "DNA testing offers a unique opportunity to understand your genetic makeup. By analyzing your genes, we can provide insights into your ancestry, disease risks, and inherited traits. This information allows us to create a personalized health plan tailored to your genetic profile. Whether you're curious about your origins or want to take proactive steps towards better health, our DNA testing services provide valuable insights.",
    },
    icon: tabIcons.tab3,
  },
  {
    label: "Blood Bank",
    content: {
      title: "Donate blood, save lives.",
      list: [
        { text: "Find nearest center" },
        { text: "Check donation eligibility" },
        { text: "Register as donor" },
        { text: "Learn blood types" },
        { text: "Benefits of donation" },
        { text: "Schedule appointment" },
      ],
      paragraph:
        "Blood donation is a simple yet powerful way to make a difference in someone's life. By donating blood, you help save lives and support patients in need of transfusions. Our blood bank services provide all the necessary information and support for donors, ensuring that the process is safe and efficient. Every drop of blood donated can be a lifeline for those undergoing surgeries, cancer treatments, or other critical care.",
    },
    icon: tabIcons.tab4,
  },
]);

const selectedTab = ref(0);
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease; /* Можешь изменить продолжительность */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
