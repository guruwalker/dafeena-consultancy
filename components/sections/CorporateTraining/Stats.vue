<template>
    <div id="statistic-5" class="py-100 statistic-section division">
        <div class="container">
            <!-- STATISTIC-1 WRAPPER -->
            <div class="statistic-5-wrapper">
                <div class="row row-cols-1 row-cols-md-3">
                    <!-- STATISTIC BLOCK #1 -->
                    <div class="col">
                        <div id="sb-5-1" class="animate__animated animate__fadeInUp">
                            <div class="statistic-block">
                                <!-- Digit -->
                                <div class="statistic-digit">
                                    <h2 class="s-44 w-700">
                                        <span class="count-element d-flex">
                                            <SharedCounterUp :start="0" :end="17" :duration="2000" />+
                                        </span>
                                    </h2>
                                </div>
                                <!-- Text -->
                                <div class="statistic-txt">
                                    <h5 class="s-19 w-700">Workshops Conducted</h5>
                                    <p>Empowering professionals with essential skills.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END STATISTIC BLOCK #1 -->
                    <!-- STATISTIC BLOCK #2 -->
                    <div class="col">
                        <div id="sb-5-2" class="animate__animated animate__fadeInUp">
                            <div class="statistic-block">
                                <!-- Digit -->
                                <div class="statistic-digit">
                                    <h2 class="s-44 w-700">
                                        <span class="count-element d-flex">
                                            <SharedCounterUp :start="0" :end="100" :duration="2000" /> +
                                        </span>
                                    </h2>
                                </div>
                                <!-- Text -->
                                <div class="statistic-txt">
                                    <h5 class="s-19 w-700">Positive Reviews</h5>
                                    <p>Highly rated workshops and training programs.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END STATISTIC BLOCK #2 -->
                    <!-- STATISTIC BLOCK #3 -->
                    <div class="col">
                        <div id="sb-5-3" class="animate__animated animate__fadeInUp">
                            <div class="statistic-block">
                                <!-- Digit -->
                                <div class="statistic-digit">
                                    <h2 class="s-44 w-700">
                                        <span class="count-element d-flex">
                                            <SharedCounterUp :start="0" :end="4.8" :duration="2000" /> /5
                                        </span>
                                    </h2>
                                </div>
                                <!-- Text -->
                                <div class="statistic-txt">
                                    <h5 class="s-19 w-700">Rating</h5>
                                    <p>Trusted by organizations for impactful learning.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END STATISTIC BLOCK #3 -->
                </div>
                <!-- End row -->
            </div>
            <!-- END STATISTIC-5 WRAPPER -->
        </div>
        <!-- End container -->
    </div>
    <hr class="divider" />
</template>
